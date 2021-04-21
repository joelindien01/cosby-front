export enum EnumProductRoles {
  VIEW_PRODUCT ="view-product",
  EDIT_PRODUCT ="edit-product",
  CANCEL_PRODUCT = "cancel-product"
}

export function DecoEnumProductRoles (constructor: Function) {
  constructor.prototype.EnumProductRoles = EnumProductRoles;
}

export enum EnumPoRoles {
  VIEW_PO ="view-po",
  ADD_PO ="add-po",
  CANCEL_PO = "cancel-po"
}
export function DecoEnumPoRoles (constructor: Function) {
  constructor.prototype.EnumPoRoles = EnumPoRoles;
}
