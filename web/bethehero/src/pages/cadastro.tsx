/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from './cadastro.module.css'
import betheheroImg from '../assets/bethehero.svg'
import backImg from '../assets/back.svg'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Unautorized } from './components/Unautorized'
import api from '../axios/axios'

const formSchema = z.object({
  nameOng: z.string(),
  email: z.string().email(),
  whatsApp: z.string(),
  city: z.string(),
  uf: z.string()
}) 

type TypeFormSchema = z.infer<typeof formSchema>

export function Cadastro() {
  
  const { register, handleSubmit } = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema)
  })

  const navigate = useNavigate()
  const [autorizado, setAutorizado ] = useState(true)

  async function createOngUser(data: TypeFormSchema) {
    try {
      await api.post("http://localhost:3333/ongs", data)
      .then(response => {
        console.log(response)
        navigate("/home")
      })
      .catch(() => {
        setAutorizado(false)
      })
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content_box}>
        <div className={styles.left}>
          <div>
            <img src={betheheroImg} alt="BeTheHero" />
          </div>
          <div className={styles.text}>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          </div>
          <div className={styles.footer}>
            <Link to={"/"} className={styles.link}>
              <img src={backImg} alt="back"/>
              Voltar para logon
            </Link>
          </div>
        </div>
        <div onSubmit={handleSubmit(createOngUser)} className={styles.containerforms}>
          <form className={styles.forms} >
            <input type="text" placeholder="Nome da ONG" className={styles.input} {...register("nameOng")}/>
            <input type="text" placeholder="E-mail" className={styles.input} {...register("email")} required aria-required="true"/>
            <input type="text" placeholder="Número de telefone" className={styles.input} {...register("whatsApp")}/>
            <div className={styles.especial_form}>
              <input type="text" placeholder="Cidade" className={styles.inputespecial1} {...register("city")}/>
              <input type="text" placeholder="UF" className={styles.inputespecial2} maxLength={2} {...register("uf")}/>
            </div>
            <div>
              <button type='submit' className={styles.bttCadastro}>Cadastrar</button>
              {!autorizado && <Unautorized />}
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}