import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Example() {
const [formData, setFormData] = useState({
username: "",
about: "",
firstName: "",
lastName: "",
email: "",
country: "United States",
city: "",
});

const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // вставь свой токен
const CHAT_ID = "YOUR_CHAT_ID"; // вставь свой chat_id

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
e.preventDefault();


const message = `


📝 Новая анкета:
👤 Username: ${formData.username}
📖 About: ${formData.about}
👩‍💼 Имя: ${formData.firstName}
👨‍💼 Фамилия: ${formData.lastName}
📧 Email: ${formData.email}
🌍 Страна: ${formData.country}
🏙️ Город: ${formData.city}
`;


try {
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    }
  );

  if (response.ok) {
    alert("✅ Данные успешно отправлены в Telegram!");
    setFormData({
      username: "",
      about: "",
      firstName: "",
      lastName: "",
      email: "",
      country: "United States",
      city: "",
    });
  } else {
    alert("❌ Ошибка при отправке данных.");
  }
} catch (error) {
  console.error("Ошибка:", error);
  alert("⚠️ Не удалось связаться с Telegram API.");
}


};

return ( <form onSubmit={handleSubmit}> <div className="space-y-12 bg-black"> <div className="border-b border-white/10 pb-12"> <h2 className="text-base font-semibold text-white">Profile</h2> <p className="mt-1 text-sm text-gray-400">
This information will be displayed publicly so be careful what you share. </p>


       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">t.me/</div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium text-white">
            About
          </label>
          <textarea
            id="about"
            name="about"
            rows={3}
            value={formData.about}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="firstName" className="block text-sm font-medium text-white">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="block text-sm font-medium text-white">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium text-white">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <ChevronDownIcon className="size-4 text-gray-400" />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="city" className="block text-sm font-medium text-white">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm font-semibold text-white">
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none"
    >
      Save
    </button>
  </div>
</form>


);
}
