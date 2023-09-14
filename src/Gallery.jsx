import { useQuery } from '@tanstack/react-query';
import axios  from 'axios';
import React from 'react'
import { useGlobalContext } from './context';

const url = 'https://api.unsplash.com/search/photos?client_id=vtq7Q33Uld6exDHf4wNDbJEoMaN_5JVTUgocnKbB8Qk';

const Gallery = () => {

    const {searchTerm} = useGlobalContext();

    const response = useQuery({

        queryKey:['images', searchTerm],
        queryFn: async() => {
            const response = await axios.get(`${url}&query=${searchTerm}`);
            return response.data;
        },

    });

    console.log(response);

    if(response.isLoading){
        return(
            <section className='image-container'>
                <h4>Loading..</h4>
            </section>
        )
    }

    if(response.isError){
        return(
            <section className='image-container'>
                <h4>Error..</h4>
            </section>
        )
    }

    const results = response.data.results;

  return (

    <section className='image-container'>{

        results.map((item) => {
            const url = item?.urls?.regular;
            return <img src={url} key={item.id}
        className='img' />
        })

    }
        

    </section>
  )
}

export default Gallery