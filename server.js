import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// 🧱 Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// ⚙️ Конфигурация Telegram
const BOT_TOKEN = "8446686541:AAGbrfdDr3ezp4aAuQwDEYeVZLB34DZmRAc";
const CHAT_ID = "1395598568";

// 📩 POST маршрут для заказов
app.post("/api/order", async (req, res) => {
  try {
    const { firstName, lastName, phone, delivery, payment, date, comment } = req.body;

    // Проверка обязательных полей
    if (!firstName || !phone) {
      return res.status(400).json({ error: "Имя и телефон обязательны" });
    }

    // Сообщение для Telegram
    const message = `
📦 *Новый заказ на свечи*
━━━━━━━━━━━━━━━
👤 Имя: ${firstName} \n
👥 Фамилия: ${lastName || "—"}
--
📞 Телефон: ${phone}
--
🚚 Доставка: ${delivery || "—"}
--
💳 Оплата: ${payment || "—"}
--
🗓 Дата отправки: ${date || "—"}
--
💬 Комментарий: ${comment || "—"}
--━━━━━━━━━━━━━━━
`;

    // Отправка в Telegram
    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const tgData = await tgResponse.json();

    if (!tgResponse.ok || !tgData.ok) {
      console.error("Ошибка Telegram:", tgData);
      return res.status(500).json({ error: "Ошибка при отправке в Telegram" });
    }

    console.log("✅ Новый заказ успешно отправлен в Telegram");
    res.json({ success: true, message: "Заказ успешно отправлен!" });

  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: "Ошибка на сервере" });
  }
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));
