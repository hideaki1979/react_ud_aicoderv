import { useState } from "react";
import "./App.css";
import openai from "./lib/openai";
import Markdown from "react-markdown";

function App() {
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const prompt = `
   あなたは優秀なフルスタックエンジニアです。
   今から送信するコードの
   ・問題点の指摘
   ・問題点を修正し、アンチパターンではないベストプラクティスにしたコード
   （Reactはバージョン18以降、Next.jsはバージョン15以降など言語は最新バージョンをベースに修正してください）
   （開発環境はViteを使用しているのでViteベースに修正してください。）
   ・修正点の説明
   をそれぞれセクションに分けて書いてください。
   回答は必ずMarkdown形式かつ、タイトル部分を###で出力してください。
   改行が必要な場合は、改行を入れて見やすい文章にしてください。
   問題点の指摘や修正点の説明はプログラミング初心者にもわかるように、詳しく説明してください。 
  `;

  const handleAiReview = async () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: content,
      },
    ];
    const response = await openai.completion(messages);
    setAnswer(response);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <header className="flex w-full max-w-5xl justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-900">AI Code Review</h1>
      </header>
      <main className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden h-[70vh]">
        <div className="flex flex-col w-1/2 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="h-full w-full bg-transparent text-white resize-none outline-none"
            ></textarea>
          </div>
          <button
            disabled={isLoading}
            onClick={handleAiReview}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "レビュー中" : "レビューする"}
          </button>
        </div>
        <div className="flex flex-col w-1/2 h-full items-center justify-center">
          {isLoading ? (
            <div>Is Loading...</div>
          ) : (
            <div className="p-4 overflow-y-auto w-full">
              <Markdown className="markdown">{answer}</Markdown>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
