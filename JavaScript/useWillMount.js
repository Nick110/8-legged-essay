import { useRef } from 'react'

const useWillMount = (cb) => {
  const willMount = useRef(true)
  if (willMount.current) {
    cb()
  }
  willMount.current = false
}

export default useWillMount