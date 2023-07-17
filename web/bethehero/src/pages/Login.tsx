/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from './login.module.css'
import beheroImg from '../assets/bethehero.svg'
import betheheroImg2 from '../assets/imgbethehero.svg'
import registerSvg from '../assets/cadastro.svg'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import api from '../axios/axios'
import { useState } from 'react'
import { Autenticacao } from './components/Autenticacao'


const loginSchema = z.object({
  loginId: z.string().nonempty()
})

type LoginSchemaType = z.infer<typeof loginSchema>


export function LoginPage() {
  const [trueMessage, setTrueMessage] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })
  
  async function loginUserOng(data: LoginSchemaType) {
    const { loginId } = data
    try {
      await api.get(loginId)
      .then((response) => {
        console.log(response)
        navigate("/home")
      })
    } catch (err) {
      console.log(err)
      setTrueMessage(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.left}>
          <img src={beheroImg} alt="bethehero" />
          <div className={styles.login_box}>
            <h1>Faça seu logon</h1>
            <form onSubmit={handleSubmit(loginUserOng)} className={styles.inputs} >
              <input type='string' placeholder='Sua ID' {...register("loginId")} required aria-required="true"/>
              <button type="submit" className={styles.bttCadastro}>Entrar</button>
            </form>
            {trueMessage && <Autenticacao />}
            <div className={styles.icons}>
              <img src={registerSvg} alt="register" />
              <Link to={"/cadastro"}>Não tenho cadastro</Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <img src={betheheroImg2} alt="bethehero" />
        </div>
      </div>
    </div>
  )
}