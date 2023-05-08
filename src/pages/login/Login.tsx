import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/loginapi'
import kakao from '../../assets/images/kakao_login_large_wide.png'
import Header from '../../components/header/Header'
import jwt_Decode from 'jwt-decode'
import { onSetCookieHandler, onSetLocalStorageHandler } from '../../util/cookie'
import {
  KakaoLoginImg,
  LoginBtn,
  LoginContainer,
  LoginContainerForm,
  LoginInput,
  LoginInputDiv,
  LoginLabelDiv,
  LoginSocialContainer,
} from './loginSt'
import CustomAlert from '../../components/alret/CustomAlert'
function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showCustomAlert, setShowCustomAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const onClickLoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    login({ id: id, password: password })
      .then((res) => {
        const authId = res.data.accessToken
        const nickname = res.data.nickname
        const profileUrl = res.data.profileUrl
        const decodeUserInfo = JSON.stringify(jwt_Decode(authId))
        const refreshToken = res.data.refreshToken
        onSetCookieHandler('accessToken', authId)
        onSetLocalStorageHandler('img', profileUrl)
        onSetLocalStorageHandler('accessToken', authId)
        onSetLocalStorageHandler('nickname', nickname)
        onSetLocalStorageHandler('refresh', refreshToken)
        onSetLocalStorageHandler('userInfo', decodeUserInfo)
        navigate('/recommend')
      })
      .catch(() => {
        setAlertMessage('아이디 또는 비밀번호가 일치하지 않습니다.')
        setShowCustomAlert(true)
      })
  }

  const onKakaoLoginHandler = async () => {
    window.location.href = KAKAO_AUTH_URL
  }

  return (
    <>
      <CustomAlert
        showAlert={showCustomAlert}
        onHide={() => setShowCustomAlert(false)}
        message={alertMessage}
        loginState={false}
      />
      <Header />
      <LoginContainer>
        <p>Log in</p>
        <LoginContainerForm>
          <div>
            <LoginLabelDiv>
              <label>아이디</label>
            </LoginLabelDiv>
            <LoginInputDiv>
              <LoginInput
                type="text"
                placeholder="아이디를 입력하세요."
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </LoginInputDiv>
          </div>
          <div>
            <LoginLabelDiv>
              <label>비밀번호</label>
            </LoginLabelDiv>
            <LoginInputDiv>
              <LoginInput
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LoginInputDiv>
          </div>
          <LoginBtn onClick={(e) => onClickLoginHandler(e)}>Log in</LoginBtn>
          <LoginBtn onClick={() => navigate('/signup')}>Sign Up</LoginBtn>
        </LoginContainerForm>
        <LoginSocialContainer>
          <KakaoLoginImg
            src={kakao}
            alt="카카오 로그인"
            onClick={() => {
              onKakaoLoginHandler()
            }}
          />
        </LoginSocialContainer>
      </LoginContainer>
    </>
  )
}

export default Login
