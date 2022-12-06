import React, { useEffect } from 'react'

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - 2ndHandBook`;
    }, [title])
}

export default useTitle