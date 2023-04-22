import axios from 'axios'

export interface UserInfo {
  id?: string
  email?: string
  nickname?: string
  password?: string
  confirm?: string
}

// 회원가입
export const register = async (body: UserInfo) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/signUp`,
    body
  )
  return response
}

// Id 중복 체크
export const checkId = async (id?: string) => {
  const value = { id: id }
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/signup/idCheck`,
    value
  )
  return response
}

// 닉네임 중복 체크
export const checkNickname = async (nickname?: string) => {
  const value = { nickname: nickname }
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/api/signup/nicknameCheck`,
    value
  )
  return response
}

// 이메일 인증
export const authEmail = async (email:string) => {
  const body ={
    email
  }
  const response  = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/email`, body)
  return response
}

// 이메일 인증
export const checkAuthEmailNumber = async (email: string, password:string) => {
  const body = {
    email,
    password
  }
  const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/emailCheck`, body)
  return response
} 