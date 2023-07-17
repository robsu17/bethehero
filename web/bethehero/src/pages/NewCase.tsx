/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from './NewCase.module.css'

import betheheroImg from '../assets/bethehero.svg'
import backImg from '../assets/back.svg'

import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import api from '../axios/axios'

const NewCaseFormSchema = z.object({
  caseName: z.string(),
  description: z.string(),
  price: z.string()
})

type NewCaseFormType = z.infer<typeof NewCaseFormSchema>

export function NewCase() {

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<NewCaseFormType>({
    resolver: zodResolver(NewCaseFormSchema)
  })

  async function NewCaseFetch(data: NewCaseFormType) {
    const { caseName, description, price } = data

    await api.get("")
    .then(async response => {
      const ongId: string = response.data[0].ong_id
      await api.post(`/${ongId}/cases`, {
        caseName,
        description,
        price: parseFloat(price)
      })
      .then(response => {
        console.log(response)
        navigate("/home")
      })
      .catch(err => {
        console.error(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.content_box}>
        <div className={styles.left}>
          <div>
            <img src={betheheroImg} alt="BeTheHero" />
          </div>
          <div className={styles.text}>
            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          </div>
          <div className={styles.footer}>
            <Link to={"/home"} className={styles.link}>
              <img src={backImg} alt="back"/>
              Voltar para home
            </Link>
          </div>
        </div>
        <div onSubmit={handleSubmit(NewCaseFetch)} className={styles.containerforms}>
          <form className={styles.forms} >
            <input type="text" placeholder="Título do caso" className={styles.input} {...register("caseName")} required/>
            <input type="text" placeholder="Descrição" className={styles.input_especial} {...register("description")} required/>
            <input type="text" placeholder="Valor em reais" className={styles.input} {...register("price")} required/>
            <div className={styles.buttons}>
              <button type='reset' className={styles.bttCancel}>Cancelar</button>
              <button type='submit' className={styles.bttCadastro}>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}