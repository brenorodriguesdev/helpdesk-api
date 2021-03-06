import { LoginRepository } from '../data/contracts/login-repository'
import { Login } from '../data/entities/login'
import { database } from '../main/config/database'

export class LoginRepositoryPG implements LoginRepository {
  async create (login: Login): Promise<void> {
    await database.none('insert into login (email, name, password, company, idLoginType) values ($1, $2, $3, $4, $5)', [login.email, login.name, login.password, login.company, login.type.id])
  }

  async findByEmail (email: string): Promise<Login> {
    const login = await database.oneOrNone('select * from login where email = $1', [email])
    if (!login) {
      return null
    }
    const type = await database.oneOrNone('select * from loginType where id = $1', [login.idlogintype])
    const loginModel = { ...login, type }
    delete loginModel.idlogintype
    return loginModel
  }

  async findById (id: number): Promise<Login> {
    const login = await database.oneOrNone('select * from login where id = $1', [id])
    if (!login) {
      return null
    }
    const type = await database.oneOrNone('select * from loginType where id = $1', [login.idlogintype])
    const loginModel = { ...login, type }
    delete loginModel.idlogintype
    return loginModel
  }

  async getAllByType (idLoginType: number): Promise<Login[]> {
    const loginsTable = await database.manyOrNone(`select
    login.id as id,
    login.email as email,
    login.name as name,
    login.password as password,
    login.company as company,
    logintype.id as idlogintype,
    logintype.name as namelogintype
    from 
    login login, 
    loginType loginType 
    where 
    login.idlogintype = 2
    and loginType.id = login.idlogintype`, [idLoginType])
    return loginsTable.map(loginTable => {
      const login: Login = {
        id: loginTable.id,
        email: loginTable.email,
        name: loginTable.name,
        password: loginTable.password,
        company: loginTable.company,
        type: {
          id: loginTable.idloginType,
          name: loginTable.tablenamelogintype
        }
      }
      return login
    })
  }
}
