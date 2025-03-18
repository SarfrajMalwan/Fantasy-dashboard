import { Icon } from "@iconify/react";
import { Grid, FormControl, TextField, FormHelperText, Button, FormControlLabel, Switch, TextFieldProps, Autocomplete } from "@mui/material";
import { auto } from "@popperjs/core";
import { constants } from "buffer";
import { format } from "date-fns";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputType } from "src/context/types";
import DateTimeYearPicker from "src/views/components/pickers/DateTimeYearPicker";
import * as yup from 'yup';


interface FieldOption {
  value: string | number;
  label: string;
}

interface FieldSchema {
  label: string;
  type: string;
  meta?: {
    hidden?: boolean;
    type?: string;
    key?: string;
  };
  oneOf?: FieldOption[];
}


interface SchemaFormProps {
  describedSchema: yup.SchemaObjectDescription;
  defaultValues?: Record<string, any>;
  onSubmit: SubmitHandler<any>;
  isDialog?: boolean
  gx?: number;
}





const SchemaForm: React.FC<SchemaFormProps> = ({ describedSchema, onSubmit, defaultValues, isDialog, gx }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues });

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          {Object.keys(describedSchema?.fields).map(fieldName => {
            const field = describedSchema.fields[fieldName] as yup.SchemaDescription & { meta: any }
            if (field?.meta?.hidden) {
              return <></>
            }

            let label = field.label
            if (!label) {
              label = fieldName.replaceAll('_', ' ')
              label = label.charAt(0).toUpperCase() + label.slice(1)
            }
            let type = inputType[field.type]

            if (field.meta?.type == 'select') {
              field.oneOf = ['Select', ...((constants as any)?.[field.meta?.key as any] || [])]
              console.log('label: ', label)
            }

            if (field.type == 'boolean') {
              field.oneOf = [
                {
                  value: 1,
                  label: 'YES'
                },
                {
                  value: 0,
                  label: 'NO'
                }
              ]
            }
            if (field?.meta?.type == 'file') {
              type = 'file'
            }
            if (field?.meta?.type === 'switch') {
              type = 'switch'
            }

            if (field.meta?.type == 'password') {
              type = 'password'
            }

            return (
              <Grid item xs={12} sm={gx || field?.meta?.sm || 6}>
                <FormControl fullWidth>
                  <Controller
                    name={fieldName as any}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {

                      if (type == 'file') {
                        return (
                          <>
                            <Button variant='outlined' fullWidth size='large' color='secondary'>
                              <label
                                htmlFor={`user-view-${fieldName}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  justifyContent: 'start',
                                  alignItems: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <Icon icon={'mdi:cloud-upload-outline'} />
                                <p
                                  style={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    margin: '0 0 0 5px'
                                  }}
                                >
                                  {value?.name || label}
                                </p>
                              </label>
                            </Button>

                            <input
                              type='file'
                              id={`user-view-${fieldName}`}
                              hidden
                              onChange={e => {
                                let file = e.target.files?.[0]
                                if (file) {
                                  setValue(fieldName as any, file)
                                }
                              }}
                              {...field?.meta?.attr}
                            />
                          </>
                        )
                      }

                      try {
                        if (field.oneOf.length) {
                          return (
                            <Autocomplete
                              options={[...field.oneOf]}
                              onChange={(e, value: any) => {
                                setValue(
                                  fieldName as any,
                                  (typeof value === 'object' ? value?.value : value) as any
                                )
                              }}
                              getOptionLabel={(option: any) =>
                                typeof option == 'object' ? option.label : option
                              }
                              value={
                                field.oneOf.find((f: any) => {
                                  return f.value == value
                                }) || value
                              }
                              renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => {
                                return <TextField {...params} label={label} />
                              }}
                            />
                          )
                        }
                      } catch (e) {
                        console.error(fieldName)
                        return <></>
                      }
                      if (type === 'switch') {

                        return (
                          <FormControlLabel required control={<Switch
                            checked={value}
                            onChange={e => {
                              setValue(fieldName as any, e.target.checked)
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />} label={field?.label} />


                        )
                      }

                      if (type === 'datetime-local' || type == 'date') {
                        return (
                          <DateTimeYearPicker
                            label={label}
                            value={value}
                            onChange={(date: Date) => {
                              setValue(fieldName as any, format(new Date(date), 'yyyy-MM-dd HH:mm:ss'))
                            }}
                          />
                        )
                      }

                      return (
                        <TextField
                          value={value}
                          label={label}
                          onChange={e => {
                            setValue(fieldName as any, e.target.value)

                          }}
                          type={type}
                          error={Boolean((errors as any)[fieldName])}
                          helperText={(errors as any)[fieldName]?.message}
                        />
                      )
                    }}
                  />
                  {(errors as any)[fieldName] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                      {(errors as any)[fieldName]?.message}
                    </FormHelperText>
                  )}
                </FormControl>

              </Grid>
            )
          })}
          {!isDialog && <Grid item xs={6} md={6}>
            <Button variant='contained' sx={{ mt: 4, ml: auto }} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Grid>}

        </Grid>
      </form>
    </>
  )
}


export default SchemaForm;
