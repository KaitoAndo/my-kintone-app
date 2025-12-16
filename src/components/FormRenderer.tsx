import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, NumberInput, Select, Button, Box, Group, Title } from '@mantine/core';
import { AppSchema } from '../types';

interface Props {
  schema: AppSchema;
  onSubmit: (data: any) => void;
}

export const FormRenderer = ({ schema, onSubmit }: Props) => {
  // React Hook Formの初期化
  const { register, handleSubmit, setValue } = useForm();

  // フォーム送信時の処理
  const onFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
  };

  return (
    <Box maw={600} mx="auto" mt="xl" p="md" style={{ border: '1px solid #eee', borderRadius: 8 }}>
      <Title order={3} mb="lg">{schema.name}</Title>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {schema.fields.map((field) => {
          // 幅のスタイル調整
          const widthStyle = field.width === 'half' ? { width: '48%', display: 'inline-block', marginRight: '2%' } : { width: '100%' };

          return (
            <Box key={field.fieldCode} mb="md" style={widthStyle}>
              {/* テキスト入力の場合 */}
              {field.type === 'SINGLE_LINE_TEXT' && (
                <TextInput
                  label={field.label}
                  withAsterisk={field.required}
                  {...register(field.fieldCode, { required: field.required })}
                />
              )}

              {/* 数値入力の場合 (MantineのNumberInputは特殊なのでsetValueを使う) */}
              {field.type === 'NUMBER' && (
                <NumberInput
                  label={field.label}
                  withAsterisk={field.required}
                  onChange={(val) => setValue(field.fieldCode, val)}
                />
              )}

              {/* 選択肢の場合 */}
              {field.type === 'SELECT' && (
                <Select
                  label={field.label}
                  data={field.options || []}
                  withAsterisk={field.required}
                  onChange={(val) => setValue(field.fieldCode, val)}
                />
              )}
            </Box>
          );
        })}

        <Group justify="flex-end" mt="xl">
          <Button type="submit">保存する</Button>
        </Group>
      </form>
    </Box>
  );
};
