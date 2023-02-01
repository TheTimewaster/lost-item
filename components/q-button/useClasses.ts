export default (props: { type: 'primary' | 'secondary'; size: 'lg' | 'sm'; square: boolean; round: boolean }) => {
  const classes = computed(() => ({
    'rounded-xl font-bold': true,
    'bg-lemon-500 hover:bg-lemon-400 text-black': props.type === 'primary',
    'bg-gray-200 hover:bg-gray-300 dark:bg-dark-200 dark:hover:bg-dark-100 dark:text-white text-black': props.type === 'secondary',
    'w-12': props.square && props.size === 'lg',
    'h-12 px-4 py-2': props.size === 'lg',
    'w-8': props.square && props.size === 'sm',
    'h-8 px-2 py-1 leading-none': props.size === 'sm',
    'rounded-full': props.round,
  }));

  return classes;
};
