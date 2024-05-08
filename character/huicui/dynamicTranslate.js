import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	cuijian: function (player) {
		return "出牌阶段限一次，你可以选择一名有手牌的其他角色。若其手牌中有【闪】，则其将所有【闪】和防具牌交给你" + (player.hasMark("zhtongyuan_basic") ? "" : "，然后你交给其等量的牌") + "。" + (player.hasMark("zhtongyuan_trick") ? "若其手牌中没有【闪】，则你摸两张牌。" : "");
	},
	dunshi: function (player) {
		var info = player.storage.dunshi;
		var str = "每回合限一次。你可以视为使用或打出一张";
		var list = ["sha", "shan", "tao", "jiu"];
		for (var i of list) {
			var strx = "【" + get.translation(i) + "】";
			if (info && !info[0].includes(i)) strx = '<span style="text-decoration:line-through;">' + strx + "</span>";
			str += strx;
			if (i != "jiu") str += "/";
		}
		str += "，然后当前回合角色于本回合内下一次造成伤害时，你选择两项：⒈防止此伤害。系统从技能名中包含“仁/义/礼/智/信”字样的技能中随机选择三个其未拥有的技能，然后你令当前回合角色获得其中一个技能。⒉从〖遁世〗中删除你本次使用或打出的牌并获得一个“席”。⒊减1点体力上限并摸X张牌（X为你的“席”数）。";
		return str;
	},
	dcporui: function (player) {
		return "每轮限" + (player.hasMark("dcgonghu_basic") ? "两" : "一") + "次。其他角色的结束阶段，你可以弃置一张牌并选择另一名于此回合内失去过牌的其他角色，你视为对其依次使用X+1张【杀】" + (player.hasMark("dcgonghu_damage") ? "" : "，然后你交给其X张手牌") + "（X为其本回合失去的牌数且至多为5）。";
	},
	dcmanwang: function (player) {
		var num = 4 - player.countMark("dcmanwang");
		var str = "出牌阶段，你可以弃置任意张牌。然后你依次执行以下选项中的前X项：";
		var list = ["⒈获得〖叛侵〗。", "⒉摸一张牌。", "⒊回复1点体力。", "⒋摸两张牌并失去〖叛侵〗。"];
		for (var i = 0; i < 4; i++) {
			if (i == num) {
				str += '<span style="text-decoration: line-through;">';
			}
			str += list[i];
		}
		if (num < 4) str += "</span>";
		return str;
	},
	dcjianzhuan(player) {
		let str = "锁定技。①当你于出牌阶段使用牌时，你选择此阶段未执行过的一项执行：";
		const list = ["⒈令一名角色弃置X张牌", "；", "⒉摸X张牌", "；", "⒊重铸X张牌", "；", "⒋弃置X张牌"],
			info = get.info("dcjianzhuan").choices,
			storage = player.getStorage("dcjianzhuan");
		let choices = [];
		for (const k in info) choices.push(k);
		for (let i = 0; i < list.length; i++) {
			const j = i / 2,
				goon = Array.from({ length: list.length })
					.map((_, i) => i)
					.includes(j);
			if (goon && storage.includes(choices[j])) str += '<span style="text-decoration: line-through;">';
			str += list[i];
			if (goon && storage.includes(choices[j])) str += "</span>";
		}
		return str + "（X为此技能于本阶段的发动次数）。②出牌阶段结束时，若你本阶段执行过〖渐专①〗的所有选项，则你随机移除〖渐专①〗的一项。";
	},
};
export default dynamicTranslates;
