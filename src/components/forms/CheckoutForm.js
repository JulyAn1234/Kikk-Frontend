import * as yup from 'yup';
import { Grid, TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function CheckoutForm ({ onSubmit, editValues }) {

  const defaultValues = {
    name: "",
    address: ""
  }

  const checkoutFormSchema = yup.object().shape({
    name: yup.string().required('You need to add a name.'),
    address: yup.string().required('You need to add an address.'),
  })

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: editValues || defaultValues,
    resolver: yupResolver(checkoutFormSchema),
    mode: 'all',
  })

  return (
    <form
      id='checkout-form'
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
                label='Your Name'
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
            name='address'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Your address'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  )
}