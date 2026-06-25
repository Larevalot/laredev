import { r as __exportAll } from "../entry.mjs";
//#region src/pages/api/chat.ts
var chat_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { messages } = await request.json();
		const response = await fetch("https://token-plan-sgp.xiaomimimo.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer tp-soiw2rn86hyheccg9plwh30qgoj9wklf61snorzfj2d5hiu1`
			},
			body: JSON.stringify({
				model: "mimo-v2.5-pro",
				messages,
				temperature: .7,
				max_tokens: 1024
			})
		});
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return new Response(JSON.stringify({ error: errorData.error?.message || `API error: ${response.status}` }), {
				status: response.status,
				headers: { "Content-Type": "application/json" }
			});
		}
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/chat@_@ts
var page = () => chat_exports;
//#endregion
export { page };
