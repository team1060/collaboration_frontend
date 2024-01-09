import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { updateMember } from '../../../services/admin/MemberService';

const MemberModal = ({ open, onClose, member, fetchMembers }) => {
  const [memberData, setMemberData] = useState({
    email: '',
    nickname: '',
    name: '',
    type: '',
    role: '',
  });

  useEffect(() => {
    if (member) {
      setMemberData({
        ...member,
        type: member.type.toString(),  // 'type' 값을 문자열로 변환
        role: member.role.toString(),  // 'role' 값을 문자열로 변환
      });
    } else {
      setMemberData({
        email: '',
        nickname: '',
        name: '',
        type: '',
        role: '',
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleSubmit = async () => {
    if (member) {
      await updateMember(member.email, memberData);  // member의 이메일을 사용하여 업데이트
      fetchMembers();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{member ? '회원 수정' : '회원 추가'}</DialogTitle>
      <DialogContent>
        {member ? (
          // 수정 모드 UI
          <React.Fragment>
            <TextField
              margin="dense"
              label="등급"
              type="text"
              fullWidth
              variant="outlined"
              name="type"
              value={memberData.type}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="이름"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={memberData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="권한"
              type="text"
              fullWidth
              variant="outlined"
              name="role"
              value={memberData.role}
              onChange={handleChange}
            />
          </React.Fragment>
        ) : (
          // 추가 모드 UI
          <React.Fragment>
            <TextField
              margin="dense"
              label="이메일"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={memberData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="닉네임"
              type="text"
              fullWidth
              variant="outlined"
              name="nickname"
              value={memberData.nickname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="이름"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={memberData.name}
              onChange={handleChange}
            />
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>{member ? '수정' : '추가'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberModal;
