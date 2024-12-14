import mysql from "mysql2/promise";

async function dbConnect() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return conn;
}

export async function dbQuery(sql, values) {
  const connection = await dbConnect();
  const [rows] = await connection.query(sql, values);
  return rows;
}

export async function populateTableWithSampleData() {
  const connection = await dbConnect();

  const sampleData = [
    [100001, "Diabetes", "Improved"],
    [100002, "Hypertension", "Stable"],
    [100003, "Flu", "Recovered"],
    [100004, "Asthma", "Controlled"],
    [100005, "Covid-19", "Recovered"],
    [100006, "Migraine", "Under Treatment"],
    [100007, "Allergy", "Stable"],
    [100008, "Depression", "Improving"],
    [100009, "Arthritis", "Stable"],
    [100010, "Heart Disease", "Under Observation"],
    [100011, "Pneumonia", "Recovered"],
    [100012, "Obesity", "Improving"],
    [100013, "Back Pain", "Under Treatment"],
    [100014, "Kidney Stones", "Resolved"],
    [100015, "Cancer", "Under Treatment"],
    [100016, "Ulcer", "Healing"],
    [100017, "Infection", "Cleared"],
    [100018, "Skin Rash", "Improving"],
    [100019, "Anemia", "Under Treatment"],
    [100020, "Stroke", "Rehabilitating"],
  ];

  const sql = `INSERT INTO medical_report (patient_id, medical_condition, treatment_result) VALUES ?`;

  const [rows] = await connection.query(sql, [sampleData]);
  return rows;
}

export async function dbCreateAndPopulate() {
  const connection1 = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const sql1 = `CREATE DATABASE ${process.env.DB_NAME}`;
  await connection1.query(sql1);

  const connection2 = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const sql_create_table_users = `CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    emirates_id	VARCHAR(50),
    email	VARCHAR(30) NOT NULL UNIQUE,
    password	VARCHAR(100),
    last_otp	VARCHAR(30),
    otp_verification_status	VARCHAR(30) DEFAULT 'pending',
    user_type	VARCHAR(30),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_patients = `CREATE TABLE patients (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    user_id	INTEGER NOT NULL UNIQUE,
    patient_id	INTEGER NOT NULL UNIQUE,
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_doctors = `CREATE TABLE doctors (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    user_id	INTEGER NOT NULL UNIQUE,
    doctor_id	INTEGER NOT NULL UNIQUE,
    hospital_id	INTEGER NOT NULL UNIQUE,
    contact_info	VARCHAR(30),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_hospitals = `CREATE TABLE hospitals (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    name	VARCHAR(30),
    contact_info	VARCHAR(30),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_medical_report = `CREATE TABLE medical_report (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    patient_id	INTEGER NOT NULL,
    age	INTEGER,
    gender	VARCHAR(50),
    location	VARCHAR(50),
    medical_condition	VARCHAR(100),
    treatment_result	VARCHAR(1000),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_form_requests = `CREATE TABLE form_request (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    user_id	INTEGER NOT NULL,
    classification_id	INTEGER NOT NULL,
    age_range	VARCHAR(30),
    gender	VARCHAR(30),
    geo_location	VARCHAR(30),
    access_level	VARCHAR(30),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;
  const sql_create_table_access_requests = `CREATE TABLE access_request (
    id	INTEGER NOT NULL AUTO_INCREMENT,
    user_id	VARCHAR(50),
    name	VARCHAR(50),
    emirates_id	VARCHAR(50),
    email	VARCHAR(50),
    job_title	VARCHAR(100),
    work_place	VARCHAR(100),
    request_status VARCHAR(50),
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`;

  await connection2.query(sql_create_table_users);
  await connection2.query(sql_create_table_patients);
  await connection2.query(sql_create_table_doctors);
  await connection2.query(sql_create_table_hospitals);
  await connection2.query(sql_create_table_medical_report);
  await connection2.query(sql_create_table_form_requests);
  await connection2.query(sql_create_table_access_requests);
}
