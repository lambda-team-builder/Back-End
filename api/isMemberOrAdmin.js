const ClassroomAdmins = require("../data/models/classroomAdminsModel.js");
const ClassroomMemebrs = require("../data/models/classroomMembersModel");

module.exports = async function(user_id, classroom_id) {
  const adminsPromise = ClassroomAdmins.getAdminsByClassroomId(classroom_id);
  const membersPromise = ClassroomMemebrs.getMembersByClassroomId(classroom_id);

  const [admins, members] = await Promise.all([adminsPromise, membersPromise]);

  const isAdmin = admins.includes(user_id);
  let isMember = false;
  members.forEach(member => {
    if (member.user_id === user_id) {
      isMember = true;
    }
  });

  return isAdmin || isMember;
};
