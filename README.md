## simple-issue-tracker-project

เว็บแอพพลิเคชันสำหรับติตามและจัดการรายการปัญหา หรือสิ่งที่ต้องทำภายในโปรเจ็คขนาดเล็ก

วิธีการติดตั้ง:::
หลังจากเข้าถึง folder ของโปรเจ็คแล้ว 
ฝั่ง backend::
1.ให้เข้าถึง folder backend แล้วเปิด terminal ขึ้นมา ใช้คำสั่ง npm install เพื่อติดตั้ง
2.สร้างไฟล์ .env ที่ level เดัยวกับ app.js แล้วตั้ง config enviroment ที่จะใช้งาน 

ตัวอย่าง:
PORT=4000
DATABASE_NAME=ชื่อdatabase
DATABASE_USER=ชื่อusername
DATABASE_PASSWORD=1212121212112
DATABASE_HOST=abababababab-postgres.render.com
JWT_SECRET=bd388346b31c8
CORS_ORIGIN=http://localhost:5173

3. ใช้คำสั่ง npm run dev เพื่อรัน

ฝั่ง frontend::
1.ให้เข้าถึง folder frontend แล้วเปิด terminal ขึ้นมา ใช้คำสั่ง npm install เพื่อติดตั้ง
2. ใช้คำสั่ง npm run dev เพื่อรัน
