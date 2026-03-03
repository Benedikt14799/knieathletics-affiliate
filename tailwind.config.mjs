/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'blue-bayoux': {
                    '50': '#f1f9fa',
                    '100': '#dbeef2',
                    '200': '#badee7',
                    '300': '#8bc6d5',
                    '400': '#54a5bc',
                    '500': '#3989a1',
                    '600': '#327088',
                    '700': '#316277',
                    '800': '#2d4e5d',
                    '900': '#294250',
                    '950': '#172a35',
                },
            }
        },
    },
    plugins: [],
}
