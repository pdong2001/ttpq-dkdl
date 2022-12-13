import { useRadioGroup, HStack, UseRadioGroupProps, StackProps } from '@chakra-ui/react';
import RadioCard from './RadioCard';

type Props = UseRadioGroupProps & StackProps & { options: { value: any; label: string }[] };

const RadioButtonGroup = (props: Props) => {
  const { options, defaultValue, onChange, name, ...hstackProps } = props;
  //   const options = ['react', 'vue', 'svelte'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} {...hstackProps}>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard w='full' key={value} {...radio}>
            {label}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default RadioButtonGroup;
