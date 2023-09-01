const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://seokjun:khElBqffRjsSifNv@seokjun.0v6yfhe.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Mongo_DB 연결 성공");

    // MongoDB 스키마 정의
    const tagSchema = new mongoose.Schema({
      tagId: String,
      name: String,
    });

    // MongoDB 모델 생성
    const Tag = mongoose.model("Tag", tagSchema);

    // 데이터 추가 (예시 데이터)
    const initialTags = [
      {
        tagId: "1",
        name: "Start",
      },
      {
        tagId: "2",
        name: "No1PartsError",
      },
      // 더 많은 태그를 추가할 수 있습니다.
    ];

    await Tag.insertMany(initialTags);
    console.log("Initial tags added");

    // Express 라우트: 모든 Tag 데이터 가져오기
    app.get("/tags", async (req, res) => {
      try {
        const tags = await Tag.find();
        res.json(tags);
      } catch (error) {
        res.status(500).json({ error: "Error fetching tags" });
      }
    });

    // Express 서버 열기
    app.listen(3004, () => {
      console.log("Server is listening on port 3004");
    });
  })
  .catch((err) => console.log(err));
