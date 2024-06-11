const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			inputs: {}
		},
		actions: {
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

			login: async () => {
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
					if(response.status === 401) return alert("Wrong email or password :(")
					throw Error(console.log("Something went wrong with the API"))
				}).then((data) => {
					localStorage.setItem('jwt-token', data.token)
					getActions().resetInput()
					getActions().welcomeUser()
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
				}).then((response) => {
					if(response.ok) return response.json()
					console.log(response);
				}).then((data) => {
					localStorage.setItem('user', data.username);
				}).catch((error) => {
					console.log(error)
				})
			},
			
		}
	};
};

export default getState;