import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { updateMember } from '../../../core/util/http/admin/MemberService';

const MemberModal = ({ open, onClose, member, fetchMembers }) => {
  const [memberData, setMemberData] = useState({
    email: '',
    nickname: '',
    name: '',
    username: '',
    password: '',
    phone_number: '',
    type: '',
    role: '',
    auth_data: '',
   
    regdate: ''
  });
  // type 매핑
  const typeLabels = {
    0: '회원',
    1: '중간관리자',
    2: '관리자'
  };
  // const types = ['회원', '중간관리자', '관리자'];
  const roles = ['user', 'admin'];
  useEffect(() => {
    if (member) {
      setMemberData({
        ...member,
        type: parseInt(member.type), // type을 숫자로 변환
        // type: member.type.toString(),
        role: member.role.toString(),
      });
      console.log(member)
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMemberData({ ...memberData, [name]: value });
  };


  const handleSubmit = async () => {
    
    await updateMember(member.email,  memberData);
    fetchMembers();
    
    onClose();
    
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>회원 수정</DialogTitle>
      <DialogContent>
        {/* 다른 필드들은 보여주기만 하고 수정 불가능하도록 설정 */}
        <TextField
          margin="dense"
          label="이메일"
          type="email"
          fullWidth
          variant="outlined"
          name="email"
          value={memberData.email}
          disabled
        />
        <TextField
          margin="dense"
          label="닉네임"
          type="nickname"
          fullWidth
          variant="outlined"
          name="nickname"
          value={memberData.nickname}
          disabled
        />
        <TextField
          margin="dense"
          label="name"
          type="name"
          fullWidth
          variant="outlined"
          name="name"
          value={memberData.name}
          disabled
        />
        <TextField
          margin="dense"
          label="가입날짜"
          type="regdate"
          fullWidth
          variant="outlined"
          name="regdate"
          value={memberData.regdate}
          disabled
        />
    
        {/* 다른 필드들 생략, 필요에 따라 추가 */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="type-select-label">등급</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            name="type"
            value={memberData.type}
            label="등급"
            onChange={handleChange}
          >
            {Object.entries(typeLabels).map(([value, label]) => (
              <MenuItem key={value} value={parseInt(value)}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="role-select-label">권한</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            name="role"
            value={memberData.role}
            label="권한"
            onChange={handleChange}
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>수정</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberModal;
