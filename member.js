function skillsMember() {
    var skills = document.getElementById("skills");
    var skillsMember = document.getElementById("skillsMember");
    var skillsMemberValue = skillsMember.value;
    var skillsMemberValueLength = skillsMemberValue.length;
    var skillsMemberValueLengthMax = skillsMember.getAttribute("maxlength");
    var skillsMemberValueLengthMax = parseInt(skillsMemberValueLengthMax);
    var skillsMemberValueLengthMax = skillsMemberValueLengthMax + 1;
    var skillsMemberValueLengthMax = skillsMemberValueLengthMax - 1;
    var skillsMemberValueLengthMax = skillsMemberValueLengthMax - skillsMemberValueLength;
    skills.innerHTML = skillsMemberValueLengthMax;
}