// WARNING: This is a generated file that shouldn't be edited. To regenerate
// this file, run the FontCustom compiler: `fontcustom compile`
<% @glyphs.each do |name, value| %>
exports.ICON_GS_<%= name.to_s.upcase.gsub(/-/,"_") %> = "\u<%= value[:codepoint].to_s(16) %>";<% end %>
