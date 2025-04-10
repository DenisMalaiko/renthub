import { config } from '@vue/test-utils'

config.global.stubs = {
  'v-container': { template: '<div><slot /></div>'},
  'v-row': { template: '<div><slot /></div>'},
  'v-col': { template: '<div><slot /></div>'},
  NuxtLink: {
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  }
}