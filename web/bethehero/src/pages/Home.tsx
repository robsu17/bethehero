/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from './Home.module.css'
import betheheroImg from '../assets/bethehero.svg'
import power from '../assets/power.svg'
import { CaseCard } from './components/CaseCard'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import api from '../axios/axios'
import { useEffect, useState } from 'react'

interface DataInterfaceOng {
  city: string,
  email: string,
  name_ong: string,
  ong_ind: number,
  sessionId: string,
  uf: string,
  whatsApp: string
}

interface CaseInterfaceOng {
  id: number
  case: string,
  description: string,
  price: number
}

export function Home() {

  const navigate = useNavigate()
  const [cases, setCases] = useState<CaseInterfaceOng[]>()
  const [dataOng, setDataOng] = useState<DataInterfaceOng>()
  
  function OutSession() {
    console.log("DeuCerto!")
    Cookies.remove("sessionId")
    navigate("/")
  }

  function NewCase() {
    navigate("/home/newcase")
  }

  async function getData() {
    await api.get("")
    .then(async response => {
      const ongId: string = response.data[0].ong_id
      setDataOng(response.data[0])
      await api.get(`${ongId}/cases`)
      .then(response => {
        setCases(response.data)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
   
  useEffect(() => {
    void getData()
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <img src={betheheroImg} alt="bethehero" />
          <h1>Bem vinda, {dataOng?.name_ong}</h1>
        </div>
        <div className={styles.right}>
          <button onClick={NewCase} className={styles.bttNewCase}>Cadastrar novo caso</button>
          <button onClick={OutSession} className={styles.bttOut}>
            <img src={power} alt="ButtonOut" />
          </button>
        </div>
      </div>
      <div className={styles.casos_container}>
        <header>
          <h1>Casos cadastrados</h1>
        </header>
        <div className={styles.cases}>
          {cases && cases?.map((dados) => {
            return <CaseCard key={dados.id} id={dados.id} caseName={dados.case} description={dados.description} price={dados.price} />
          })}
        </div>
      </div>

    </div>
  )
}