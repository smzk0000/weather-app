"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const fetchWeather = async () => {
    setError("");
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );
    const data = await res.json();
    if (data.cod !== 200) {
      setError("都市が見つかりませんでした");
      setWeather(null);
      return;
    }
    setWeather(data);
  };


  return (
    <div>
      <h1>天気アプリ</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") fetchWeather(); }}
        placeholder="都市名を入力"
      />
      <button onClick={fetchWeather}>検索</button>

      {error && <p>{error}</p>}

      {/* 取得できたら表示 */}
      {weather && (
        <div>
          <h2>{weather.name}の天気</h2>
          <p>天気：{weather.weather[0].description}</p>
          <p>気温：{weather.main.temp}℃</p>
          <p>湿度：{weather.main.humidity}%</p>
          <p>風速：{weather.wind.speed}m/s</p>
        </div>
      )}
    </div>
  );
}