import * as yup from 'yup';
import { Box, Chip, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ProductForm ({ onSubmit, editValues }) {

  const defaultValues = {
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
  }

  const productFormSchema = yup.object().shape({
    name: yup.string().required('You need to add a name.'),
    imageUrl: yup.string().required('You need to add an image url.'),
    description: yup.string(),
    price: yup.number().required('You need to add a price.'),
  })

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: editValues || defaultValues,
    resolver: yupResolver(productFormSchema),
    mode: 'all',
  })

  const imageUrlValue = watch('imageUrl')

  return (
    <form
      id='product-form'
      onReset={() => reset(defaultValues)}
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: '24px' }}
    >
      <Grid container spacing={ 4 }>
        <Grid item xs={8}>
          <Controller
            control={ control }
            name='name'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Product Name'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={ control }
            name='imageUrl'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Image URL'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={ 12 }>
          <Controller
            control={ control }
            name='description'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Description'
                variant='outlined'
                fullWidth
                multiline
                minRows={2}
                maxRows={2}
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={8}>
          <Controller
            control={ control }
            name='price'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Product Price'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        {
          imageUrlValue &&
          <Grid item xs={12}>
            <img
              src={imageUrlValue}
              alt='product-image'
              style={{ width: '100%' }}
            />
          </Grid>
        }
      </Grid>
    </form>
  )
}