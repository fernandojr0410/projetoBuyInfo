use projetoBuyInfo;

CREATE TABLE IF NOT EXISTS `projetoBuyInfo`.`Imagens` (
  `IdImagens:` INT NOT NULL,
  `Nome:` VARCHAR(45) NOT NULL,
  `Produto_IdProduto:` INT NOT NULL,
  PRIMARY KEY (`IdImagens:`, `Produto_IdProduto:`),
  INDEX `fk_Imagens_Produto1_idx` (`Produto_IdProduto:` ASC) VISIBLE,
  CONSTRAINT `fk_Imagens_Produto1`
    FOREIGN KEY (`Produto_IdProduto:`)
    REFERENCES `projetoBuyInfo`.`Produto` (`IdProduto:`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB