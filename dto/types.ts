export interface ExpectedDataType {
  url: string
  login: Login
  products: Products
}

export interface Login {
  title: string
  header: string
  section: any
  elements: Element[]
}

export interface Element {
  form: Form
}

export interface Form {
  username: string
  password: string
  button: string
}

export interface Products {
  title: string
  header: string
  section: string
  elements: Element2[]
}

export interface Element2 {
  filter?: Filter
  cart?: Cart
}

export interface Filter {
  link: string
  title: string
  button: string
}

export interface Cart {
  link: string
  counter: string
}
