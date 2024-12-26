// src/api/mockMemberService.ts

export interface Member {
  id: number;
  name: string;
  email: string;
}

// 假資料
let mockMembers: Member[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// 模擬延遲
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模擬取得會員清單
export const fetchMembers = async (): Promise<Member[]> => {
  await delay(500); // 模擬網絡延遲
  return [...mockMembers]; // 返回拷貝以避免直接修改
};

// 模擬新增會員
export const createMember = async (name: string, email: string): Promise<Member> => {
  await delay(500); // 模擬網絡延遲
  const newMember = {
    id: mockMembers.length + 1,
    name,
    email,
  };
  mockMembers.push(newMember); // 添加到假資料
  return newMember;
};
