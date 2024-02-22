const userInLocal=JSON.parse(localStorage.getItem('userInfo'))
export const token=userInLocal?userInLocal.token :null


const docInLocal=JSON.parse(localStorage.getItem('doctorInfo'))
export const doctoken = docInLocal?docInLocal.token :null

// const adminInLocal=JSON.parse(localStorage.getItem('adminInfo'))
// export const token2 = adminInLocal?adminInLocal.token :null


