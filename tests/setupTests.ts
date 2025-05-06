import { config } from '@vue/test-utils'

config.global.stubs = {
  'v-container': { template: '<div><slot /></div>'},
  'v-row': { template: '<div><slot /></div>'},
  'v-form': { template: '<div><slot /></div>'},
  'v-col': { template: '<div><slot /></div>'},
  'v-card': { template: '<div><slot /></div>'},
  'v-card-title': { template: '<div><slot /></div>'},
  'v-card-text': { template: '<div><slot /></div>'},
  'v-card-actions': { template: '<div><slot /></div>'},
  'v-img': { template: '<div><slot /></div>'},
  'v-btn': { template: '<div><slot /></div>'},
  'v-spacer': { template: '<div><slot /></div>'},
  'v-combobox': { template: '<div><slot /></div>'},
  'v-menu': { template: '<div><slot /></div>'},
  'v-text-field': { template: '<div><slot /></div>'},
  'v-date-picker': { template: '<div><slot /></div>'},
  'v-snackbar': { template: '<div><slot /></div>'},
  'v-progress-linear': { template: '<div><slot /></div>'},
  'v-dialog': { template: '<div><slot /></div>'},
  'v-select': { template: '<div><slot /></div>'},
  'v-file-input': { template: '<div><slot /></div>'},
  'v-radio-group': { template: '<div><slot /></div>'},
  'v-radio': { template: '<div><slot /></div>'},

  NuxtLink: {
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  }
}