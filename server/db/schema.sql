CREATE TABLE IF NOT EXISTS interviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_type TEXT NOT NULL,
  name TEXT,
  interview_date TEXT,
  start_date TEXT,
  available_months TEXT,
  website_viewed TEXT,
  support_field TEXT,
  work_type TEXT,
  commute_method TEXT,
  commute_time TEXT,
  birth_date TEXT,
  age TEXT,
  experience TEXT,
  driving TEXT,
  car_owned TEXT,
  religion TEXT,
  pt TEXT,
  family TEXT,
  marriage TEXT,
  children TEXT,
  skills TEXT,
  english TEXT,
  schedule_mon TEXT,
  schedule_tue TEXT,
  schedule_wed TEXT,
  schedule_thu TEXT,
  schedule_fri TEXT,
  mbti TEXT,
  mbti_scores TEXT,
  personality_answers TEXT,
  summary1 TEXT,
  summary2 TEXT,
  summary3 TEXT,
  edu_feedback TEXT,
  contract_data TEXT,
  submitted_html TEXT,
  lecture_type TEXT,
  lecture_availability TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS interview_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  interview_id INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  original_name TEXT,
  s3_key TEXT,
  s3_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (interview_id) REFERENCES interviews(id)
);

CREATE TABLE IF NOT EXISTS work_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_key TEXT NOT NULL UNIQUE,
  data TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS work_log_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_key TEXT NOT NULL,
  file_type TEXT NOT NULL,
  original_name TEXT,
  s3_key TEXT,
  s3_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
