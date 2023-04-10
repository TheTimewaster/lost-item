export default (props: { type: 'primary' | 'secondary'; size: 'lg' | 'sm'; square: boolean; round: boolean }) => {
  const classes = computed(() => {
    const obj = {
      'font-bold leading-none': true,
      'bg-lemon-500 hover:bg-lemon-400 !text-black': props.type === 'primary',
      'bg-gray-200 hover:bg-gray-300 text-black dark:(bg-dark-200 hover:bg-dark-100 text-white)': props.type === 'secondary',
      'w-12': props.square && props.size === 'lg',
      'h-12 px-4 py-4 rounded-xl': props.size === 'lg',
      'w-8': props.square && props.size === 'sm',
      'h-8 px-2 py-1 rounded-lg': props.size === 'sm',
      '!rounded-full': props.round,
    };

    return Object.entries(obj).filter(([_, value]) => value).map(([key]) => key).join(' ');
  });

  return classes;
};
