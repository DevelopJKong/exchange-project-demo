export const mailTemplate = (email, codeNum) => {
  return `
        <strong>Exchange project</strong>
        <p>${email}님 환영합니다</p>
        <br/>
        <hr/>
        <p style="font-size:25px">아래에 있는 확인 코드를 입력해주세요☕</p>
        <p style="color:#0984e3; font-size: 25px;">${codeNum}</p>
        <br/>
        <br/>
        <p>감사합니다</p>
        <p>&copy; ${new Date().getFullYear()} Exchange project</p>
        `;
};
