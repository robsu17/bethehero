/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styles from './CaseCard.module.css'
import garbageSvg from '../../assets/garbage.svg'
import { priceFormatter } from '../../utils/formatter'
import api from '../../axios/axios'
import { useNavigate } from 'react-router-dom'

interface DataInterface {
  id: number
  caseName: string | undefined,
  description: string | undefined,
  price: number
}

export function CaseCard(data: DataInterface) {

  const navigate = useNavigate()

  async function handleClickRemoveCard(cardId: number) {
    await api.get("")
    .then(async response => {
      const ongId: string = response.data[0].ong_id
      await api.delete(`${ongId}/cases/${cardId}`)
      .then(() => {
        navigate("/")
      })
    })
  }

  return (
    <main className={styles.card} key={data.id}>
      <div>
        <div className={styles.boxClear}>
          <p className={styles.ptitle}>caso:</p>
          <button onClick={() => void handleClickRemoveCard(data.id)}>
            <img src={garbageSvg} alt="lixo" />
          </button>
        </div>
        <p className={styles.pDescription}>{data.caseName}</p>
      </div>

      <div>
        <p className={styles.ptitle}>descrição:</p>
        <p className={styles.pDescription}>{data.description}</p>
      </div>
      
      <div>
        <p className={styles.ptitle}>valor:</p>
        <p className={styles.pDescription}>{priceFormatter.format(data.price)}</p>
      </div>
    </main>
  )
}