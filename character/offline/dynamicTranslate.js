import { lib, game, ui, get, ai, _status } from "../../noname.js";

const dynamicTranslates = {
	jdjuqi(player) {
		if (player.storage.jdjuqi) return '转换技。阴：准备阶段，你摸三张牌；其他角色的准备阶段，其可以展示并交给你一张黑色手牌。<span class="bluetext">阳：准备阶段，你令你本回合使用牌无次数限制且造成的伤害+1；其他角色的准备阶段，其可以展示并交给你一张红色手牌。</span>';
		return '转换技。<span class="bluetext">阴：准备阶段，你摸三张牌；其他角色的准备阶段，其可以展示并交给你一张黑色手牌。</span>阳：准备阶段，你令你本回合使用牌无次数限制且造成的伤害+1；其他角色的准备阶段，其可以展示并交给你一张红色手牌。';
	},
	jdlongdan(player) {
		return lib.translate["jdlongdan" + (player.hasSkill("sblongdan_mark", null, null, false) ? "x" : "") + "_info"];
	},
	tylongnu(player) {
		let str="转换技，游戏开始时，你可以改变此转换技的状态。出牌阶段开始时，你可以摸一张牌并：";
		let yin="阴：失去1点体力，然后此阶段内你可以将红色手牌当无距离限制的火【杀】使用或打出；";
		if(player.hasSkill("tylongnu_yin")) yin="<span class='legendtext'>"+yin+"</span>";
		else if(!player.storage.tylongnu&&!player.hasSkill("tylongnu_yang")) yin="<span class='bluetext'>"+yin+"</span>";
		str+=yin;
		let yang="阳：减少1点体力上限，然后此阶段内你可以将锦囊牌当无次数限制的雷【杀】使用或打出。";
		if(player.hasSkill("tylongnu_yang")) yang="<span class='legendtext'>"+yang+"</span>";
		else if(player.storage.tylongnu&&!player.hasSkill("tylongnu_yin")) yang="<span class='firetext'>"+yang+"</span>";
		str+=yang;
		return str;
	},
};
export default dynamicTranslates;
