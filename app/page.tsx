"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const fetchWeather = async () => {
    setError("");
    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );
    const data = await res.json();
    setIsLoading(false);

    if (data.cod !== 200) {
      setError("都市が見つかりませんでした");
      setWeather(null);
      return;
    }
    setWeather(data);
    setHistory((prev) => {
      const next = [city, ...prev.filter((h) => h !== city)];
      return next.slice(0, 5);
    })
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

      {isLoading && <p>読み込み中...</p>}

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

      {history.length > 0 && (
        <div>
          <h3>検索履歴</h3>
          <ul>
            {history.map((h) => (
              <li key={h} onClick={() => setCity(h)}>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}