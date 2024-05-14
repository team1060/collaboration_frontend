function generateDummyData() {
  const data = [];
  for (let week = 0; week < 100; week++) {
    const weekData = {
      weekStart: `2024-01-${String(week % 4 * 7 + 1).padStart(2, '0')}`,
      days: []
    };
    for (let day = 0; day < 7; day++) {
      // 날짜 생성
      const date = `01월 ${String(week % 4 * 7 + day + 1).padStart(2, '0')}일`;
      
      // 요일 계산
      const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = daysOfWeek[(week + day) % 7];
      
      // 이벤트 데이터 생성
      const events = [
        {
          name: '한림힐스CC',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '한림힐스CC 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '비싸니까 가지마세요 응에'
        },
        {
          name: '안산W',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '안산W 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        {
          name: '용산힐스CC',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '용산힐스CC 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '비싸니까 가지마세요 응에'
        },
        {
          name: '일산W',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '일산W 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        {
          name: '부천cc',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '부천cc 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        {
          name: '천안',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '천안 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '비싸니까 가지마세요 응에'
        },
        {
          name: '미림',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '미림 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        {
          name: '한림안성',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '한림안성 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '비싸니까 가지마세요 응에'
        },
        {
          name: '선산',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '선산 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        {
          name: '진천',
          status: Math.random() < 0.5 ? '예약가능' : '예약불가',
          description: '진천 이벤트에 대한 상세 설명입니다.',
          image: '이벤트 이미지 URL',
          price: '이벤트 가격',
          content: '이벤트에 대한 추가 설명입니다.'
        },
        // 추가 이벤트...
      ];

      // 날짜 객체 생성 및 배열에 추가
      weekData.days.push({
        date: date,
        dayOfWeek: dayOfWeek, // 요일을 dayOfWeek에 추가
        events: events
      });
    }
    data.push(weekData);
  }
  return data;
}

const weeksData = generateDummyData();

export default weeksData;
