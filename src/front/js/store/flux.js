const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			inputs: {}
		},
		actions: {
			getMessage: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getInput: (event) => {
				const name = event.target.name;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},

			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			signup: async () => {
				const input = getStore().inputs

				const new_user = {
					"username": input.username,
					"email": input.email,
					"password": input.password
				}

				fetch(process.env.BACKEND_URL + "api/signup", {
					method: 'POST',
					body: JSON.stringify(new_user),
					headers: { "Content-Type": "application/json" },
				}).then(response => {
					if(response.ok) return response.json()
					if(response.status === 412) return alert("You already have an account, please go to login.")
				}).then(() => {
					getActions().login()
				}).catch((error) => {
					console.error(error)
				})
			},

			login: async (event) => {
				event.preventDefault()

				const input = getStore().inputs

				const user = {
					"email": input.email,
					"password": input.password
				}

				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					body: JSON.stringify(user),
					headers: { "Content-Type": "application/json" },
				}).then(response => {
					if(response.ok) return response.json()
					if(response.status === 404) return alert("You don't have an account yet, go to signup")
					if(response.status === 401) return alert("Wrong email or password :(")
					throw Error(console.log("Something went wrong with the API"))
				}).then((data) => {
					console.log(data);
					localStorage.setItem('jwt-token', data.token)
					localStorage.setItem('user', data.username)
					getActions().resetInput()
				}).catch((error) => {
					console.error(error)
				})
			},

			logout: () => {
				localStorage.removeItem('jwt-token')
				localStorage.removeItem('user')
				getActions().resetInput()
			},

			welcomeUser: async () => {
				const myToken = localStorage.getItem('jwt-token')

				fetch(process.env.BACKEND_URL + "api/welcome", {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + myToken,
						"Content-Type": "application/json"
					}
				}).then((response) => response.json())
				.catch((error) => {
					console.log(error)
				})
			},
			
		}
	};
};

export default getState;