import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getSurveyMusic } from '../../api/recommendApi'
import { AiOutlineClose } from 'react-icons/ai'
import { setMusicPlay } from '../../redux/modules/musicPlayer'
import { useDispatch } from 'react-redux'
import { setIsPlaying } from '../../redux/modules/isPlaying'

interface Props {
  modalState: boolean
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
  status1: number
  status2: number
}

function SurveyModal({ modalState, setModalState, status1, status2 }: Props) {
  const onClickCloseModalHandler = () => {
    setModalState(!modalState)
  }
  const { isLoading, isError, data } = useQuery(['surveyMusic'], () =>
    getSurveyMusic(status1, status2)
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  })
  const onClickMoveMusicDetailPageHandler = () => {
    dispatch(setMusicPlay(data.music))
    dispatch(setIsPlaying())
    navigate(`/recommend/music/${data.music.musicId}`)
  }
  const onClickReSurveyHandler = () => {
    window.location.replace('/survey')
  }
  if (isLoading) return null
  if (isError) return null

  return (
    <ModalContainer>
      <StModalContents>
        <div>
          <StModalClose onClick={onClickCloseModalHandler}>
            <AiOutlineClose />
          </StModalClose>
          <ModalWrap>
            <BackgroundDesign></BackgroundDesign>
            <ContainWrap>
              <StPCondition>{data.message}</StPCondition>
              <DivBar></DivBar>
              <StPRecommend color="#efefef">당신에게 추천 드릴 곡</StPRecommend>
              <StPRecommend color="#bf9b30">
                {data.music.musicTitle}
              </StPRecommend>
              <StPRecommend color="#efefef">{data.music.composer}</StPRecommend>
              <StPRecommend color="#efefef">들어보시는건 어떠세요?</StPRecommend>
              <MoveBtnWrap>
                <StDivMoveBtn color="#AAAAAA" onClick={onClickReSurveyHandler}>
                  <StSpanMoveMusic>설문조사 다시 하기</StSpanMoveMusic>
                </StDivMoveBtn>
                <StDivMoveBtn
                  color="#bf9b30"
                  onClick={onClickMoveMusicDetailPageHandler}
                >
                  <StSpanMoveMusic>곡 들으러 가기</StSpanMoveMusic>
                </StDivMoveBtn>
              </MoveBtnWrap>
            </ContainWrap>
          </ModalWrap>
        </div>
      </StModalContents>
    </ModalContainer>
  )
}

export default SurveyModal

const ModalContainer = styled.div`
  animation: modal-show 0.3s;
  animation: modal-bg-show 0.3s;
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`
const StModalContents = styled.div`
  width: 540px;
  height: 550px;
  background-color: #281d18;
  margin: auto;
  text-align: center;
  @keyframes modal-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const StModalClose = styled.div`
  position: absolute;
  width: 30px;
  color: #ffffff;
  margin-left: 550px;
  font-size: 22px;
  cursor: pointer;
`
const StPCondition = styled.p`
  color: #efefef;
  margin-top: 95px;
  font-size: 25px;
  font-weight: 500;
  font-family: var(--font-NotoSerifKR);
`
const DivBar = styled.div`
  width: 100px;
  height: 2px;
  background-color: #bf8b30;
  margin: 35px auto;
`
const StPRecommend = styled.p`
  width: 300px;
  margin: auto;
  text-align: center;
  color: ${(props) => props.color};
  font-size: 16px;
  margin-top: 30px;
  font-family: var(--font-NotoSerifKR);
`
const StDivMoveBtn = styled.div`
  width: 170px;
  height: 44px;
  line-height: 44px;
  background-color: ${(props) => props.color};
  cursor: pointer;
`
const StSpanMoveMusic = styled.span`
  color: #efefef;
  font-size: 16px;
`
const MoveBtnWrap = styled.div`
  width: 380px;
  margin: 60px auto;
  display: flex;
  justify-content: space-evenly;
`
export const ModalWrap = styled.div`
  width: 530px;
  height: 550px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`
export const BackgroundDesign = styled.div`
  width: 350px;
  height: 636px;
  margin: auto;
  background: linear-gradient(
    180deg,
    rgba(75, 55, 46, 0) 0%,
    #46342b 46.35%,
    rgba(40, 29, 24, 0) 100%
  );
  transform: rotate(-53.65deg);
  position: absolute;
  top: -40px;
  left: 100px;
  z-index: 0;
`
export const ContainWrap = styled.div`
  position: relative;
  z-index: 2;
`
