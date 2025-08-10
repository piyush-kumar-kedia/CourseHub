import json
import requests

COURSE_LIST_FILE = 'list.json'
API_ROOT = 'http://localhost:8080/api/course'
# API_ROOT = '${serverRoot}/api/course'

with open(COURSE_LIST_FILE, 'r', encoding='utf-8') as f:
    all_courses = json.load(f)

course_entries = []
for code, name in all_courses.items():
    clean_code = code.replace(" ", "").upper()
    course_entries.append({
        "code": clean_code,
        "name": name.strip() if name else "Name Unavailable"
    })

try:
    existing_courses_resp = requests.get(f'{API_ROOT}')
    existing_courses_resp.raise_for_status()
    existing_courses = existing_courses_resp.json()
except requests.RequestException as e:
    print(f"Failed to fetch existing courses from DB: {e}")
    exit(1)

existing_codes = set(course['code'].replace(" ", "").upper()
                     for course in existing_courses)

missing_courses = [
    course for course in course_entries if course['code'] not in existing_codes]

print(f"Total courses in JSON: {len(course_entries)}")
print(f"Courses already in DB: {len(existing_codes)}")
print(f"Missing courses to sync: {len(missing_courses)}")

if not missing_courses:
    print("All courses are already synced!")
    exit(0)

confirm = input(
    "Do you want to sync the missing courses? (yes/no): ").strip().lower()
if confirm != "yes":
    print("Aborting sync.")
    exit(0)

for course in missing_courses:
    try:
        resp = requests.post(
            f'{API_ROOT}/create/{course["code"]}', json={"name": course["name"]})
        if resp.status_code == 201:
            print(f"Created: {course['code']} - {course['name']}")
        elif resp.status_code == 200 and "already exists" in resp.text:
            print(f"Already exists: {course['code']}")
        else:
            print(
                f"Failed to create: {course['code']} - Status: {resp.status_code} | {resp.text}")
    except requests.RequestException as e:
        print(f"Error while creating {course['code']}: {e}")

print("Sync completed.")
