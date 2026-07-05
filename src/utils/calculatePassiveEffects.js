export function calculatePassiveEffects(selectedSkills, passiveSkills) {
  const totals = {};

  selectedSkills.forEach((skillName) => {
    if (!skillName) return;

    const skill = passiveSkills.find(
      (passive) => passive.name === skillName
    );

    if (!skill) return;

    (skill.effects || []).forEach((effect) => {
      if (effect.type !== "percent") return;

      totals[effect.stat] =
        (totals[effect.stat] || 0) + effect.value;
    });
  });

  return totals;
}