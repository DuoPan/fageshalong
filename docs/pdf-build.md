# PDF 导出说明

推荐使用 Pandoc + XeLaTeX 导出中文 PDF。

## 产品介绍 PDF

```powershell
pandoc docs/product-introduction.md `
  -o docs/product-introduction.pdf `
  --pdf-engine=xelatex `
  -V documentclass=ctexart `
  -V mainfont="Microsoft YaHei" `
  -V CJKmainfont="Microsoft YaHei" `
  -V fontsize=11pt `
  -H docs/pandoc-product-style.tex
```

## 说明

- `docs/pandoc-product-style.tex` 用来优化页边距、字号、行距、标题、列表和页码。
- `documentclass=ctexart` 对中文支持更稳定。
- `CJKmainfont` 明确指定中文字体，避免中文显示异常。
- 如果 MiKTeX 提示更新，不影响 PDF 生成；需要时打开 MiKTeX Console 更新即可。
