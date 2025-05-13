import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { checkIsDoctor } from "../../../../middlewares/auth";
import { dbQuery } from "../../../../helpers/databaseHelper";

import OpenAI from "openai";

export async function POST(request) {
  try {
    let {
      patientId,
      age,
      gender,
      location,
      medicalCondition,
      treatmentResult,
      pdfText,
    } = await request.json();

    let patientHistory = "No data available";
    let diagnosisSummaryRaw = "";
    let diagnosisSummaryPublic = "";
    let diagnosisSummaryDoctor = "";
    let diagnosisSummaryResearcher = "";

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    const headersList = await headers();
    const authToken = headersList.get("Authorization");

    const isDoctor = await checkIsDoctor(authToken);

    if (!isDoctor) {
      return NextResponse.json(
        { status: "success", message: "Invalid credential", data: null },
        { status: 401 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (type == "pdfUpload") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: "Provide json data as per given instruction.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Go through below text data and provide output as json. The output json will have these keys: patient_id(integer), age(integer), gender(male/female), location(string, all lowercase), medical_condition(string), treatment_result(string), patient_history(string, patient's clinical history if any).
                Here is text data: ${pdfText}`,
              },
            ],
          },
        ],
        response_format: {
          type: "json_object",
        },
        temperature: 1,
        max_completion_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const contentFromModel = completion.choices[0].message.content;

      const content = JSON.parse(contentFromModel);

      patientId = content.patient_id;
      age = content.age;
      gender = content.gender;
      location = content.location;
      medicalCondition = content.medical_condition;
      treatmentResult = content.treatment_result;
      patientHistory = content.patient_history || "No data available";
    }

    const patientInfo = {
      patientId,
      age,
      gender,
      location,
      medicalCondition,
      treatmentResult,
      patientHistory,
    };

    const completion2 = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "Provide json data as per given instruction.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Go through the provided patient data: ${JSON.stringify(
                patientInfo
              )}. Give me output as json and the output will have below mentioned keys. Details are given for each keys how the summary will be created from given patient data:
            1. diagnosis_summary_raw(string): Summary of the patient data
            2. diagnosis_summary_public(string): Summary of the patient data considering that it will be displayed as public data so make necessary data masking for patient name etc.
            3. diagnosis_summary_doctor(string): Summary of the patient data modified in a way that best suited for doctor's analysis
            4. diagnosis_summary_researcher(string): Summary of the patient data modified in a way that best suited for researcher's analysis and make necessary data masking for patient name etc.`,
            },
          ],
        },
      ],
      response_format: {
        type: "json_object",
      },
      temperature: 1,
      max_completion_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const contentFromModel2 = completion2.choices[0].message.content;

    const content2 = JSON.parse(contentFromModel2);

    diagnosisSummaryRaw = content2.diagnosis_summary_raw;
    diagnosisSummaryPublic = content2.diagnosis_summary_public;
    diagnosisSummaryDoctor = content2.diagnosis_summary_doctor;
    diagnosisSummaryResearcher = content2.diagnosis_summary_researcher;

    const dataFromDb = await dbQuery(
      `INSERT INTO medical_report (patient_id, age, gender, location, medical_condition, treatment_result, patient_history, summary_raw, summary_public, summary_doctor, summary_researcher)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(patientId),
        age,
        gender,
        location,
        medicalCondition,
        treatmentResult,
        patientHistory,
        diagnosisSummaryRaw,
        diagnosisSummaryPublic,
        diagnosisSummaryDoctor,
        diagnosisSummaryResearcher,
      ]
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Submission success",
        data: dataFromDb,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error?.message || "Something went wrong",
        data: null,
      },
      { status: 500 }
    );
  }
}
