import { instance } from './instance'

// 프로필 조회
export const showProfile = async () => {
  const response = await instance.get('/api/user/userinfo')
  return response.data.userInfo
}

// 내가 한 스크랩 조회
export const showScrap = async (id: number) => {
  const response = await instance.get(`/api/user/scraplist?page=${id}`)
  return response.data
}

// 내가 한 댓글 조회
export const showComment = async (id: number) => {
  const response = await instance.get(`/api/user/reviewlist?page=${id}`)
  return response.data
}

// 내가 한 좋아요 조회
export const likedMusic = async (id: number) => {
  const response = await instance.get(`/api/user/likelist?page=${id}`)
  return response.data
}

// 프로필 이미지 수정
export const editProfileImg = async (newProfile: FormData) => {
  await instance.patch('/api/user/uploadprofile', newProfile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 닉네임 수정
export const changeNickname = async (newNickname: string) => {
  const body = {
    nickname: newNickname,
  }
  await instance.patch('/api/user/changenickname', body)
}

// 계정 삭제
export const deleteAccount = async (password:string) => {
  const response = await instance.delete('/api/user/delete', {data:{email: password}})
  return response
}
